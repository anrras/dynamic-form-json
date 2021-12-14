import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollToInvalidField]',
})
export class ScrollToInvalidFieldDirective {
  @HostListener('click') onClick() {
    const elementList = document.querySelectorAll('.ng-invalid');
    const element = elementList[0] as HTMLElement;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
