import { Component, model, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppTitleComponent } from 'design-system/title/title.component';
import { IconComponent } from 'design-system/icon/icon.component';
import { ButtonComponent } from 'design-system/button/button.component';
import type { User } from 'shared/db-models.interface';

const initialItem: User = {
  name: '',
  email: '',
  phone: '',
  website: ''
};

export interface Modal {
  isOpen: boolean;
  form: User;
}

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrl: 'modal.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppTitleComponent, IconComponent, ButtonComponent]
})

export class ModalComponent {
  public isOpen = model<Modal['isOpen']>(false);
  public formSubmit = output<User>();
  public productToDelete = output<User['id']>();
  public form!: FormGroup;

  public newItem: boolean = true;
  public item: User = initialItem;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+9725[0-9]{8}$/)
      ]),
      website: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/)
      ])
    });
  }

  openModal(initialValues?: User) {
    if (initialValues) {
      this.item = initialValues;
      this.newItem = false;
      this.form.setValue({ name: initialValues.name, email: initialValues.email, phone: initialValues.phone, website: initialValues.website });
      this.form.get('email')?.disable();
    } else {
      this.form.get('email')?.enable();
    }
    this.isOpen.set(true);
  }

  closeModal() {
    this.form.reset({ name: '', email: '', phone: '', website: ''});
    this.newItem = true;
    this.item = initialItem;
    this.form.get('email')?.disable();
    this.isOpen.set(false);
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit({...this.item, ...this.form.value});
      this.closeModal();
    }
  }

  deleteProduct() {
    this.productToDelete.emit(this.item.id)
    this.closeModal();
  }
}
