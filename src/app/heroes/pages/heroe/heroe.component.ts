import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Hero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroeService: HeroesService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params  
    .pipe(switchMap( ({id}) => this.heroeService.getHeroeById(id)))

      .subscribe(heroe =>{
        this.heroe = heroe;
      })
  }

}
