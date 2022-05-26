import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: []
})
export class HeroeTarjetaComponent {

  @Input() heroe!: Hero;

}
