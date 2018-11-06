import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../noticias.service';
import { AutoresService } from '../autores.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-admin-cadastrar-noticia',
  templateUrl: './admin-cadastrar-noticia.component.html',
  styleUrls: ['./admin-cadastrar-noticia.component.css']
})
export class AdminCadastrarNoticiaComponent implements OnInit {
  titulo = null;
  autores = null;
  autor = {id: null};
  resumo = null;
  conteudo = null;
  data = null;
  destaque = false;
  publicada = false;
  salvar_ok = false;
  salvar_erro = false;

  noticia = null;

  

  constructor(private noticias_service: NoticiasService, private autores_service: AutoresService, private router: Router,
     private route: ActivatedRoute ) { }

  ngOnInit() {
    this.autores = this.autores_service.todos();
    const id = this.route.snapshot.paramMap.get[id]
    if (id != 'novo'){
      this.noticia=this.noticias_service.encontrar(Number.parseInt(id)).subscribe(
        noticia => {
        this.salvar_ok = true;
      },
      erro => {
        
      }
    )
    this.titulo = this.noticia.titulo
    this.resumo = this.noticia.resumo
    this.conteudo = this.noticia.conteudo
    this.autor = this.noticia.autor

    }
  }

  salvar() {
    
      this.noticias_service.salvar(this.titulo, this.resumo, this.conteudo, this.autor,
        this.data, this.publicada, this.destaque).subscribe(
          noticia => {
            this.salvar_ok = true;
          },
          erro => {
            console.log(erro);
            this.salvar_erro = true;
          }
        )
    }
}
