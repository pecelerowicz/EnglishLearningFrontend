import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VocabResponse, DidGuessRequest } from 'src/app/dto/dto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  vocab: VocabResponse = {id: -1, polish: '', english: ''};
  isPolish: boolean = true;
  display: string = this.vocab.polish;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRandomVocab();
  } 

  learnNewRandom() {
    this.http.get<VocabResponse>('http://localhost:8080/api/new').subscribe(
      (val) => {
        this.vocab = val;
        this.isPolish = true;
        this.display = this.vocab.polish;
      },
      (err) => {
        console.log(err);
      }
    ); 
  }

  didGuess(didGuess: boolean) {
    let payload: DidGuessRequest = {id: this.vocab.id, didGuess: didGuess};
    this.http.post<VocabResponse>('http://localhost:8080/api/did-guess', payload).subscribe(
      (val) => {
        this.vocab = val;
        this.isPolish = true;
        this.display = this.vocab.polish;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  switch() {
    this.isPolish = !this.isPolish;
    if(this.isPolish) {
      this.display = this.vocab.polish;
    } else {
      this.display = this.vocab.english;
    }
  }

  getRandomVocab() {
    this.http.get<VocabResponse>('http://localhost:8080/api/old').subscribe(
      (val) => {
        this.vocab = val;
        this.isPolish = true;
        this.display = this.vocab.polish;
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
