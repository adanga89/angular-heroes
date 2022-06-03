import { Component, OnInit } from '@angular/core';
import { Subscriber, switchMap } from 'rxjs';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100%;
      border-radius: 5px;
    }
  `
  ]
})
export class AgregarComponent implements OnInit {

  title: string = "Agregar";
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

  constructor(private heroeService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.router.url.includes("editar")){
      this.title = "Editar";
      this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.heroeService.getHeroeById(id))
      )
      .subscribe( heroe => this.heroe = heroe);
    }
    else
      this.title = "Nuevo";
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0) return;

    if(this.heroe.id){
      this.heroeService.actualizarSuperHeroe(this.heroe)
      .subscribe(heroe => {
        this.mostrarSnackBar("Registro Editado...")
      });
    }else{
      this.heroeService.agregarSuperHeroe(this.heroe)
        .subscribe(res => {
          this.router.navigate([`/heroes/editar`,this.heroe.id])
          this.mostrarSnackBar("Registro Creado...")
        });
    }
  }

  eliminar(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: {...this.heroe}
    });

    dialog.afterClosed()
      .subscribe(result => {
        if(!result) return;
          this.heroeService.borrarSuperHeroe(this.heroe.id)
          .subscribe(res => {
            this.router.navigate([`/heroes`])
          });
      });
 
  }

  mostrarSnackBar(mensaje: string): void{
    this.snackBar.open(mensaje, 'ok!',{duration:2500});
  }
}
