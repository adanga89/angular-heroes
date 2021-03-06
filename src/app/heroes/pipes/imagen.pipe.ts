import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //pure: false //Si se deja el pure en false, siempre se va a lanzar el pipe
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Hero): string {
    if(!heroe.id && !heroe.alt_img)
      return `assets/no-image.png`;
    else if(heroe.alt_img) 
      return heroe.alt_img;

    return `assets/heroes/${ heroe.id }.jpg`;
  }

}
