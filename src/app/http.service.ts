import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pokemon } from 'src/Models/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

 constructor(private http: HttpClient) { }


  async getPokemonObject(pokemon: string): Promise<Pokemon> {
    try {
      let data = await this.http.get<any>('https://pokeapi.co/api/v2/pokemon/' + pokemon).toPromise();

      return {
        name: data.name,
        image: data.sprites.front_default
      };
    }
    catch(e) {
      console.log(e);
      return {
        name: "",
        image: ""
      };
    }
    //return;
  }
}
