import { AfterViewInit, Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavbarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  menu!:HTMLElement | null
  menuIcon!:HTMLImageElement | null

  ngAfterViewInit(): void {
    this.menu = document.getElementById("menu")
    this.menuIcon = document.getElementById("menuIcon") as HTMLImageElement

    const elements = document.querySelectorAll("[id$='-page']")
    const elementsA = Array.from(document.querySelectorAll(".anchor"))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentSection = elementsA.find( section => (section.children[0] as HTMLAnchorElement).href.includes(entry.target.id))
            currentSection?.classList.add('selected')

            const lastSection = elementsA.filter( section => !(section.children[0] as HTMLAnchorElement).href.includes(entry.target.id))
            lastSection.forEach(element => {
              element.classList.remove('selected')
            });
          }else{
            const currentSection = elementsA.find( section => (section.children[0] as HTMLAnchorElement).href.includes(entry.target.id))
            currentSection?.classList.remove('selected')
          }
        })
      },{ threshold: 0.2 }
    )

    elements.forEach(element => {
      observer.observe(element)
    });
  }

  toggleMenu = () => {
    this.menu?.classList.toggle("nav__links-container");
    this.menuIcon?.classList.toggle("active");
    const src = this.menuIcon?.classList.contains("active") ?
    "/assets/icons/close-menu.svg" :
    "/assets/icons/menu.svg";
    this.menuIcon!.src = src
  }
}
