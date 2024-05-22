import { CUSTOM_ELEMENTS_SCHEMA, Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ReactiveFormsModule, MatSlideToggleModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  toggleControl = new FormControl(false);

  constructor(private overlay: OverlayContainer) {}

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((isDarkMode) => {
      const darkClassName = 'theme-dark';
      const lightClassName = 'theme-light';
      const body = document.body;

      if (isDarkMode) {
        body.classList.add(darkClassName);
        body.classList.remove(lightClassName);
        body.setAttribute('data-theme', 'dark');
      } else {
        body.classList.add(lightClassName);
        body.classList.remove(darkClassName);
        body.setAttribute('data-theme', 'light');
      }

      // Apply to overlay container if using Angular Material overlays (dialogs, tooltips, etc.)
      const overlayContainerClasses = this.overlay.getContainerElement().classList;
      overlayContainerClasses.add(isDarkMode ? darkClassName : lightClassName);
      overlayContainerClasses.remove(isDarkMode ? lightClassName : darkClassName);
    });
  }
}

