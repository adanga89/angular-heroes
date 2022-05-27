import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = "";
  heroes: Hero[] = [];
  hereoSeleccionado: Hero | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino)
      .subscribe(heroes => this.heroes = heroes)
  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){

    if(this.heroes.length === 0) {
      this.hereoSeleccionado = undefined;
      return;
    }
    
    
    const heroe: Hero = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroeById(heroe.id)
      .subscribe(heroe => this.hereoSeleccionado = heroe);
    
  }
}
