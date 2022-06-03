import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics',   
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics',   
    }
  ]

  heroe: Hero = {
    superhero: "",
    alter_ego: "",
    characters: "",
    first_appearance: "",
    publisher: Publisher.DCComics,
    alt_img: "",
    id: ""
  };

  constructor(private heroeService: HeroesService) { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0) return;

    this.heroeService.agregarSuperHeroe(this.heroe)
      .subscribe(console.log);
  }

}
