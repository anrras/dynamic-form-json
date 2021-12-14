import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scrollToInvalidField]',
})
export class ScrollToInvalidFieldDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('submit') onClick() {
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');

    if (invalidControl) {
      invalidControl.scrollIntoView({ behavior: 'smooth' });
      const inputInvalidList = invalidControl.querySelectorAll(
        'input, select, textarea'
      );
      if (inputInvalidList.length > 0) {
        const inputInvalid = inputInvalidList[0] as HTMLElement;
        inputInvalid.focus();
      } else {
        invalidControl.focus();
      }
    }
  }
}
