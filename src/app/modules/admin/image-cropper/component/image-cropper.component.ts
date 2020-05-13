import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    NgZone,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { DomSanitizer, SafeStyle, SafeUrl } from '@angular/platform-browser';
import { CropperPosition, Dimensions, ImageCroppedEvent, MoveStart, ImageTransform } from '../interfaces';
import { getTransformationsFromExifData } from '../utils/exif.utils';
import { resizeCanvas } from '../utils/resize.utils';
import { ExifTransform } from '../interfaces/exif-transform.interface';

@Component({
    selector: 'image-cropper',
    templateUrl: './image-cropper.component.html',
    styleUrls: ['./image-cropper.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCropperComponent implements OnChanges, OnInit {
    private originalImage: HTMLImageElement | null;
    private transformedImage: HTMLImageElement;
    private originalBase64: string;
    private transformedBase64: string;
    private moveStart: MoveStart;
    private originalSize: Dimensions;
    private transformedSize: Dimensions;
    private setImageMaxSizeRetries = 0;
    private cropperScaledMinWidth = 20;
    private cropperScaledMinHeight = 20;
    private exifTransform: ExifTransform;
    private stepSize = 3;

    safeImgDataUrl: SafeUrl | string;
    safeTransformStyle: SafeStyle | string;
    marginLeft: SafeStyle | string = '0px';
    maxSize: Dimensions;
    imageVisible = false;

    @ViewChild('sourceImage', {static: false}) sourceImage: ElementRef;

    @Input()
    set imageChangedEvent(event: any) {
        this.initCropper();
        if (event && event.target && event.target.files && event.target.files.length > 0) {
            this.loadImageFile(event.target.files[0]);
        }
    }

    @Input()
    set imageBase64(imageBase64: string) {
        this.initCropper();
        this.checkExifAndLoadBase64Image(imageBase64);
    }

    @Input()
    set imageFile(file: File) {
        this.initCropper();
        if (file) {
            this.loadImageFile(file);
        }
    }

    @Input() format: 'png' | 'jpeg' | 'bmp' | 'webp' | 'ico' = 'png';
    @Input() maintainAspectRatio = true;
    @Input() transform: ImageTransform = {};
    @Input() aspectRatio = 1;
    @Input() resizeToWidth = 0;
    @Input() resizeToHeight = 0;
    @Input() cropperMinWidth = 0;
    @Input() cropperMinHeight = 0;
    @Input() canvasRotation = 0;
    @Input() initialStepSize = 3;
    @Input() roundCropper = false;
    @Input() onlyScaleDown = false;
    @Input() imageQuality = 92;
    @Input() autoCrop = true;
    @Input() backgroundColor: string;
    @Input() containWithinAspectRatio = false;
    @Input() cropper: CropperPosition = {
        x1: -100,
        y1: -100,
        x2: 10000,
        y2: 10000
    };
    @HostBinding('style.text-align')
    @Input() alignImage: 'left' | 'center' = 'center';
    @HostBinding('class.disabled')
    @Input() disabled = false;

    @Output() imageCropped = new EventEmitter<ImageCroppedEvent>();
    @Output() startCropImage = new EventEmitter<void>();
    @Output() imageLoaded = new EventEmitter<void>();
    @Output() cropperReady = new EventEmitter<Dimensions>();
    @Output() loadImageFailed = new EventEmitter<void>();

    constructor(private sanitizer: DomSanitizer,
                private cd: ChangeDetectorRef,
                private zone: NgZone) {
        this.initCropper();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.originalImage && this.originalImage.complete && (changes.containWithinAspectRatio || changes.canvasRotation)) {
            this.transformOriginalImage();
        }
        if (changes.cropper) {
            this.setMaxSize();
            this.setCropperScaledMinSize();
            this.checkCropperPosition(false);
            this.doAutoCrop();
            this.cd.markForCheck();
        }
        if (changes.aspectRatio && this.imageVisible) {
            this.resetCropperPosition();
        }
        if (changes.transform) {
            this.transform = this.transform || {};
            this.safeTransformStyle = this.sanitizer.bypassSecurityTrustStyle(
                'scaleX(' + (this.transform.scale || 1) * (this.transform.flipH ? -1 : 1) + ')' +
                'scaleY(' + (this.transform.scale || 1) * (this.transform.flipV ? -1 : 1) + ')' +
                'rotate(' + (this.transform.rotate || 0) + 'deg)'
            );
            this.doAutoCrop();
        }
    }

    ngOnInit(): void {
        this.stepSize = this.initialStepSize;
    }

    private initCropper(): void {
        this.imageVisible = false;
        this.transformedImage = null;
        this.safeImgDataUrl = 'data:image/png;base64,iVBORw0KGg'
            + 'oAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAU'
            + 'AAarVyFEAAAAASUVORK5CYII=';
        this.moveStart = {
            active: false,
            type: null,
            position: null,
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            clientX: 0,
            clientY: 0
        };
        this.maxSize = {
            width: 0,
            height: 0
        };
        this.originalSize = {
            width: 0,
            height: 0
        };
        this.transformedSize = {
            width: 0,
            height: 0
        };
        this.cropper.x1 = -100;
        this.cropper.y1 = -100;
        this.cropper.x2 = 10000;
        this.cropper.y2 = 10000;
    }

    private loadImageFile(file: File): void {
        const fileReader = new FileReader();
        fileReader.onload = (event: any) => {
            const imageType = file.type;
            if (this.isValidImageType(imageType)) {
                this.checkExifAndLoadBase64Image(event.target.result);
            } else {
                this.loadImageFailed.emit();
            }
        };
        fileReader.readAsDataURL(file);
    }

    private isValidImageType(type: string): boolean {
        return /image\/(png|jpg|jpeg|bmp|gif|tiff)/.test(type);
    }

    private checkExifAndLoadBase64Image(imageBase64: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const fail = (ex?: any) => {
                this.originalImage = null;
                this.originalBase64 = null;
                reject(ex);
            };
            this.originalImage = new Image();
            this.originalImage.onload = () => {
                this.originalBase64 = imageBase64;
                this.exifTransform = getTransformationsFromExifData(imageBase64);
                this.originalSize.width = this.originalImage.naturalWidth;
                this.originalSize.height = this.originalImage.naturalHeight;
                this.transformOriginalImage()
                    .then(() => resolve())
                    .catch(fail);
            };
            this.originalImage.onerror = fail;
            this.originalImage.src = imageBase64;
        });
    }

    private getTransformedSize(): Dimensions {
        const canvasRotation = this.canvasRotation + this.exifTransform.rotate;
        if (this.containWithinAspectRatio) {
            if (canvasRotation % 2) {
                const minWidthToContain = this.originalSize.width * this.aspectRatio;
                const minHeightToContain = this.originalSize.height / this.aspectRatio;
                return {
                    width: Math.max(this.originalSize.height, minWidthToContain),
                    height: Math.max(this.originalSize.width, minHeightToContain),
                };
            } else {
                const minWidthToContain = this.originalSize.height * this.aspectRatio;
                const minHeightToContain = this.originalSize.width / this.aspectRatio;
                return {
                    width: Math.max(this.originalSize.width, minWidthToContain),
                    height: Math.max(this.originalSize.height, minHeightToContain),
                };
            }
        }

        if (canvasRotation % 2) {
            return {
                height: this.originalSize.width,
                width: this.originalSize.height,
            };
        }
        return {
            width: this.originalSize.width,
            height: this.originalSize.height,
        };
    }
    
    private transformImageBase64(): Promise<string> {
        const canvasRotation = this.canvasRotation + this.exifTransform.rotate;
        const transformedSize = this.getTransformedSize();
        const canvas = document.createElement('canvas');
        canvas.width = transformedSize.width;
        canvas.height = transformedSize.height;
        const ctx = canvas.getContext('2d');
        ctx.setTransform(
            this.exifTransform.flip ? -1 : 1,
            0,
            0,
            1,
            canvas.width / 2,
            canvas.height / 2
        );
        ctx.rotate(Math.PI * (canvasRotation / 2));
        ctx.drawImage(
            this.originalImage,
            -this.originalSize.width / 2,
            -this.originalSize.height / 2
        );
        return Promise.resolve(canvas.toDataURL());
    }

    private setTransformedImage(transformedBase64): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.transformedBase64 = transformedBase64;
            this.safeImgDataUrl = this.sanitizer.bypassSecurityTrustResourceUrl(transformedBase64);
            this.transformedImage = new Image();
            this.transformedImage.onload = () => {
                this.transformedSize.width = this.transformedImage.naturalWidth;
                this.transformedSize.height = this.transformedImage.naturalHeight;
                resolve();
                this.cd.markForCheck();
            };
            this.transformedImage.onerror = () => {
                this.transformedImage = null;
                reject();
            };
            this.transformedImage.src = this.transformedBase64;
        });
    }

    private transformOriginalImage(): Promise<void> {
        if (!this.originalImage || !this.originalImage.complete ) {
            return Promise.reject(new Error('No Image Loaded'));
        }
        return this.transformImageBase64()
            .then(transformedBase64 => this.setTransformedImage(transformedBase64));
    }

    imageLoadedInView(): void {
        if (this.transformedImage != null) {
            this.imageLoaded.emit();
            this.setImageMaxSizeRetries = 0;
            setTimeout(() => this.checkImageMaxSizeRecursively());
        }
    }

    private checkImageMaxSizeRecursively(): void {
        if (this.setImageMaxSizeRetries > 40) {
            this.loadImageFailed.emit();
        } else if (this.sourceImage && this.sourceImage.nativeElement && this.sourceImage.nativeElement.offsetWidth > 0) {
            this.setMaxSize();
            this.setCropperScaledMinSize();
            this.resetCropperPosition();
            this.cropperReady.emit({...this.maxSize});
            this.cd.markForCheck();
        } else {
            this.setImageMaxSizeRetries++;
            setTimeout(() => {
                this.checkImageMaxSizeRecursively();
            }, 50);
        }
    }

    @HostListener('window:resize')
    onResize(): void {
        this.resizeCropperPosition();
        this.setMaxSize();
        this.setCropperScaledMinSize();
    }

    private resizeCropperPosition(): void {
        const sourceImageElement = this.sourceImage.nativeElement;
        if (this.maxSize.width !== sourceImageElement.offsetWidth || this.maxSize.height !== sourceImageElement.offsetHeight) {
            this.cropper.x1 = this.cropper.x1 * sourceImageElement.offsetWidth / this.maxSize.width;
            this.cropper.x2 = this.cropper.x2 * sourceImageElement.offsetWidth / this.maxSize.width;
            this.cropper.y1 = this.cropper.y1 * sourceImageElement.offsetHeight / this.maxSize.height;
            this.cropper.y2 = this.cropper.y2 * sourceImageElement.offsetHeight / this.maxSize.height;
        }
    }

    resetCropperPosition(): void {
        const sourceImageElement = this.sourceImage.nativeElement;
        if (!this.maintainAspectRatio) {
            this.cropper.x1 = 0;
            this.cropper.x2 = sourceImageElement.offsetWidth;
            this.cropper.y1 = 0;
            this.cropper.y2 = sourceImageElement.offsetHeight;
        } else if (sourceImageElement.offsetWidth / this.aspectRatio < sourceImageElement.offsetHeight) {
            this.cropper.x1 = 0;
            this.cropper.x2 = sourceImageElement.offsetWidth;
            const cropperHeight = sourceImageElement.offsetWidth / this.aspectRatio;
            this.cropper.y1 = (sourceImageElement.offsetHeight - cropperHeight) / 2;
            this.cropper.y2 = this.cropper.y1 + cropperHeight;
        } else {
            this.cropper.y1 = 0;
            this.cropper.y2 = sourceImageElement.offsetHeight;
            const cropperWidth = sourceImageElement.offsetHeight * this.aspectRatio;
            this.cropper.x1 = (sourceImageElement.offsetWidth - cropperWidth) / 2;
            this.cropper.x2 = this.cropper.x1 + cropperWidth;
        }
        this.doAutoCrop();
        this.imageVisible = true;
    }

    keyboardAccess(event: any) {
        this.changeKeyboardStepSize(event);
        this.keyboardMoveCropper(event);
    }

    private changeKeyboardStepSize(event: any): void {
        if (event.key >= '1' && event.key <= '9') {
            this.stepSize = +event.key;
            return;
        }
    }

    private keyboardMoveCropper(event) {
        const keyboardWhiteList: string[] = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'];
        if (!(keyboardWhiteList.includes(event.key))) {
            return;
        }
        const moveType = event.shiftKey ? 'resize' : 'move';
        const position = event.altKey ? this.getInvertedPositionForKey(event.key) : this.getPositionForKey(event.key);
        const moveEvent = this.getEventForKey(event.key, this.stepSize);
        event.preventDefault();
        event.stopPropagation();
        this.startMove({clientX: 0, clientY: 0}, moveType, position);
        this.moveImg(moveEvent);
        this.moveStop();
    }

    private getPositionForKey(key: string): string {
        switch (key) {
            case 'ArrowUp':
                return 'top';
            case 'ArrowRight':
                return 'right';
            case 'ArrowDown':
                return 'bottom';
            case 'ArrowLeft':
            default:
                return 'left';
        }
    }

    private getInvertedPositionForKey(key: string): string {
        switch (key) {
            case 'ArrowUp':
                return 'bottom';
            case 'ArrowRight':
                return 'left';
            case 'ArrowDown':
                return 'top';
            case 'ArrowLeft':
            default:
                return 'right';
        }
    }

    private getEventForKey(key: string, stepSize: number): any {
        switch (key) {
            case 'ArrowUp':
                return {clientX: 0, clientY: stepSize * -1};
            case 'ArrowRight':
                return {clientX: stepSize, clientY: 0};
            case 'ArrowDown':
                return {clientX: 0, clientY: stepSize};
            case 'ArrowLeft':
            default:
                return {clientX: stepSize * -1, clientY: 0};
        }
    }

    startMove(event: any, moveType: string, position: string | null = null): void {
        if (event.preventDefault) { event.preventDefault(); }
        this.moveStart = {
            active: true,
            type: moveType,
            position,
            clientX: this.getClientX(event),
            clientY: this.getClientY(event),
            ...this.cropper
        };
    }

    @HostListener('document:mousemove', ['$event'])
    @HostListener('document:touchmove', ['$event'])
    moveImg(event: any): void {
        if (this.moveStart.active) {
            if (event.stopPropagation) { event.stopPropagation(); }
            if (event.preventDefault) { event.preventDefault(); }
            if (this.moveStart.type === 'move') {
                this.move(event);
                this.checkCropperPosition(true);
            } else if (this.moveStart.type === 'resize') {
                this.resize(event);
                this.checkCropperPosition(false);
            }
            this.cd.detectChanges();
        }
    }

    private setMaxSize(): void {
        if (this.sourceImage) {
            const sourceImageElement = this.sourceImage.nativeElement;
            this.maxSize.width = sourceImageElement.offsetWidth;
            this.maxSize.height = sourceImageElement.offsetHeight;
            this.marginLeft = this.sanitizer.bypassSecurityTrustStyle('calc(50% - ' + this.maxSize.width / 2 + 'px)');
        }
    }

    private setCropperScaledMinSize(): void {
        if (this.transformedImage) {
            this.setCropperScaledMinWidth();
            this.setCropperScaledMinHeight();
        } else {
            this.cropperScaledMinWidth = 20;
            this.cropperScaledMinHeight = 20;
        }
    }

    private setCropperScaledMinWidth(): void {
        this.cropperScaledMinWidth = this.cropperMinWidth > 0
            ? Math.max(20, this.cropperMinWidth / this.transformedImage.width * this.maxSize.width)
            : 20;
    }

    private setCropperScaledMinHeight(): void {
        if (this.maintainAspectRatio) {
            this.cropperScaledMinHeight = Math.max(20, this.cropperScaledMinWidth / this.aspectRatio);
        } else if (this.cropperMinHeight > 0) {
            this.cropperScaledMinHeight = Math.max(20, this.cropperMinHeight / this.transformedImage.height * this.maxSize.height);
        } else {
            this.cropperScaledMinHeight = 20;
        }
    }

    private checkCropperPosition(maintainSize = false): void {
        if (this.cropper.x1 < 0) {
            this.cropper.x2 -= maintainSize ? this.cropper.x1 : 0;
            this.cropper.x1 = 0;
        }
        if (this.cropper.y1 < 0) {
            this.cropper.y2 -= maintainSize ? this.cropper.y1 : 0;
            this.cropper.y1 = 0;
        }
        if (this.cropper.x2 > this.maxSize.width) {
            this.cropper.x1 -= maintainSize ? (this.cropper.x2 - this.maxSize.width) : 0;
            this.cropper.x2 = this.maxSize.width;
        }
        if (this.cropper.y2 > this.maxSize.height) {
            this.cropper.y1 -= maintainSize ? (this.cropper.y2 - this.maxSize.height) : 0;
            this.cropper.y2 = this.maxSize.height;
        }
    }

    @HostListener('document:mouseup')
    @HostListener('document:touchend')
    moveStop(): void {
        if (this.moveStart.active) {
            this.moveStart.active = false;
            this.doAutoCrop();
        }
    }

    private move(event: any) {
        const diffX = this.getClientX(event) - this.moveStart.clientX;
        const diffY = this.getClientY(event) - this.moveStart.clientY;

        this.cropper.x1 = this.moveStart.x1 + diffX;
        this.cropper.y1 = this.moveStart.y1 + diffY;
        this.cropper.x2 = this.moveStart.x2 + diffX;
        this.cropper.y2 = this.moveStart.y2 + diffY;
    }

    private resize(event: any): void {
        const diffX = this.getClientX(event) - this.moveStart.clientX;
        const diffY = this.getClientY(event) - this.moveStart.clientY;
        switch (this.moveStart.position) {
            case 'left':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - this.cropperScaledMinWidth);
                break;
            case 'topleft':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - this.cropperScaledMinWidth);
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - this.cropperScaledMinHeight);
                break;
            case 'top':
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - this.cropperScaledMinHeight);
                break;
            case 'topright':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + this.cropperScaledMinWidth);
                this.cropper.y1 = Math.min(this.moveStart.y1 + diffY, this.cropper.y2 - this.cropperScaledMinHeight);
                break;
            case 'right':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + this.cropperScaledMinWidth);
                break;
            case 'bottomright':
                this.cropper.x2 = Math.max(this.moveStart.x2 + diffX, this.cropper.x1 + this.cropperScaledMinWidth);
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + this.cropperScaledMinHeight);
                break;
            case 'bottom':
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + this.cropperScaledMinHeight);
                break;
            case 'bottomleft':
                this.cropper.x1 = Math.min(this.moveStart.x1 + diffX, this.cropper.x2 - this.cropperScaledMinWidth);
                this.cropper.y2 = Math.max(this.moveStart.y2 + diffY, this.cropper.y1 + this.cropperScaledMinHeight);
                break;
        }

        if (this.maintainAspectRatio) {
            this.checkAspectRatio();
        }
    }

    private checkAspectRatio(): void {
        let overflowX = 0;
        let overflowY = 0;

        switch (this.moveStart.position) {
            case 'top':
                this.cropper.x2 = this.cropper.x1 + (this.cropper.y2 - this.cropper.y1) * this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'bottom':
                this.cropper.x2 = this.cropper.x1 + (this.cropper.y2 - this.cropper.y1) * this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : (overflowX / this.aspectRatio);
                }
                break;
            case 'topleft':
                this.cropper.y1 = this.cropper.y2 - (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(0 - this.cropper.x1, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x1 += (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'topright':
                this.cropper.y1 = this.cropper.y2 - (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(0 - this.cropper.y1, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y1 += (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'right':
            case 'bottomright':
                this.cropper.y2 = this.cropper.y1 + (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(this.cropper.x2 - this.maxSize.width, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x2 -= (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
            case 'left':
            case 'bottomleft':
                this.cropper.y2 = this.cropper.y1 + (this.cropper.x2 - this.cropper.x1) / this.aspectRatio;
                overflowX = Math.max(0 - this.cropper.x1, 0);
                overflowY = Math.max(this.cropper.y2 - this.maxSize.height, 0);
                if (overflowX > 0 || overflowY > 0) {
                    this.cropper.x1 += (overflowY * this.aspectRatio) > overflowX ? (overflowY * this.aspectRatio) : overflowX;
                    this.cropper.y2 -= (overflowY * this.aspectRatio) > overflowX ? overflowY : overflowX / this.aspectRatio;
                }
                break;
        }
    }

    private doAutoCrop(): void {
        if (this.autoCrop) {
            this.crop();
        }
    }

    crop(): ImageCroppedEvent | null {
        if (this.sourceImage && this.sourceImage.nativeElement && this.transformedImage != null) {
            this.startCropImage.emit();
            const imagePosition = this.getImagePosition();
            const width = imagePosition.x2 - imagePosition.x1;
            const height = imagePosition.y2 - imagePosition.y1;

            const cropCanvas = document.createElement('canvas') as HTMLCanvasElement;
            cropCanvas.width = width;
            cropCanvas.height = height;

            const ctx = cropCanvas.getContext('2d');
            if (ctx) {
                if (this.backgroundColor != null) {
                    ctx.fillStyle = this.backgroundColor;
                    ctx.fillRect(0, 0, width, height);
                }

                const scaleX = (this.transform.scale || 1) * (this.transform.flipH ? -1 : 1);
                const scaleY = (this.transform.scale || 1) * (this.transform.flipV ? -1 : 1);

                ctx.setTransform(scaleX, 0, 0, scaleY, this.transformedSize.width / 2, this.transformedSize.height / 2);
                ctx.translate(-imagePosition.x1 / scaleX, -imagePosition.y1 / scaleY);
                ctx.rotate((this.transform.rotate || 0) * Math.PI / 180);
                ctx.drawImage(this.transformedImage, -this.transformedSize.width / 2, -this.transformedSize.height / 2);

                const output: ImageCroppedEvent = {
                    width, height,
                    imagePosition,
                    cropperPosition: {...this.cropper}
                };
                if (this.containWithinAspectRatio) {
                    output.offsetImagePosition = this.getOffsetImagePosition();
                }
                const resizeRatio = this.getResizeRatio(width, height);
                if (resizeRatio !== 1) {
                    output.width = Math.round(width * resizeRatio);
                    output.height = this.maintainAspectRatio
                        ? Math.round(output.width / this.aspectRatio)
                        : Math.round(height * resizeRatio);
                    resizeCanvas(cropCanvas, output.width, output.height);
                }
                output.base64 = this.cropToBase64(cropCanvas);
                this.imageCropped.emit(output);
                return output;
            }
        }
        return null;
    }

    private getImagePosition(): CropperPosition {
        const sourceImageElement = this.sourceImage.nativeElement;
        const ratio = this.transformedSize.width / sourceImageElement.offsetWidth;

        const out: CropperPosition = {
            x1: Math.round(this.cropper.x1 * ratio),
            y1: Math.round(this.cropper.y1 * ratio),
            x2: Math.round(this.cropper.x2 * ratio),
            y2: Math.round(this.cropper.y2 * ratio)
        };

        if (!this.containWithinAspectRatio) {
            out.x1 = Math.max(out.x1, 0);
            out.y1 = Math.max(out.y1, 0);
            out.x2 = Math.min(out.x2, this.transformedSize.width);
            out.y2 = Math.min(out.y2, this.transformedSize.height);
        }

        return out;
    }

    private getOffsetImagePosition(): CropperPosition {
        const canvasRotation = this.canvasRotation + this.exifTransform.rotate;
        const sourceImageElement = this.sourceImage.nativeElement;
        const ratio = this.transformedSize.width / sourceImageElement.offsetWidth;
        let offsetX: number;
        let offsetY: number;

        if (canvasRotation % 2) {
            offsetX = (this.transformedSize.width - this.originalSize.height) / 2;
            offsetY = (this.transformedSize.height - this.originalSize.width) / 2;
        } else {
            offsetX = (this.transformedSize.width - this.originalSize.width) / 2;
            offsetY = (this.transformedSize.height - this.originalSize.height) / 2;
        }

        const out: CropperPosition = {
            x1: Math.round(this.cropper.x1 * ratio) - offsetX,
            y1: Math.round(this.cropper.y1 * ratio) - offsetY,
            x2: Math.round(this.cropper.x2 * ratio) - offsetX,
            y2: Math.round(this.cropper.y2 * ratio) - offsetY
        };

        if (!this.containWithinAspectRatio) {
            out.x1 = Math.max(out.x1, 0);
            out.y1 = Math.max(out.y1, 0);
            out.x2 = Math.min(out.x2, this.transformedSize.width);
            out.y2 = Math.min(out.y2, this.transformedSize.height);
        }

        return out;
    }

    private cropToBase64(cropCanvas: HTMLCanvasElement): string {
        return cropCanvas.toDataURL('image/' + this.format, this.getQuality());
    }

    private getQuality(): number {
        return Math.min(1, Math.max(0, this.imageQuality / 100));
    }

    private getResizeRatio(width: number, height: number): number {
        if (this.resizeToWidth > 0) {
            if (!this.onlyScaleDown || width > this.resizeToWidth) {
                return this.resizeToWidth / width;
            }
        } else if (this.resizeToHeight > 0) {
            if (!this.onlyScaleDown || height > this.resizeToHeight) {
                return this.resizeToHeight / height;
            }
        }
        return 1;
    }

    private getClientX(event: any): number {
        return (event.touches && event.touches[0] ? event.touches[0].clientX : event.clientX) || 0;
    }

    private getClientY(event: any): number {
        return (event.touches && event.touches[0] ? event.touches[0].clientY : event.clientY) || 0;
    }
}
