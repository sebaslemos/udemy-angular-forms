import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { noop, of } from 'rxjs';


@Component({
  selector: 'file-upload',
  templateUrl: "file-upload.component.html",
  styleUrls: ["file-upload.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {

  @Input()
  requiredFileType: string;

  fileName = '';

  fileUploadError = false;

  uploadProgress: number;

  onChange = (fileName: String) => { };
  onTouched = () => { };
  disabled: boolean = false;

  constructor(private http: HttpClient) { }

  onFileSelected(event) {

    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      this.fileUploadError = false;
      this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          catchError(error => {
            this.fileUploadError = true;
            return of(error);
          }),
          finalize(() => {
            this.uploadProgress = null;
          })
        )
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            this.onChange(this.fileName);
          }
        });
    }
  }

  onClick(fileUploadElement: HTMLInputElement) {
    fileUploadElement.click();
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.fileName = obj;
  }

  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}



