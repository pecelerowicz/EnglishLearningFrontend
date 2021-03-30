import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { VocabResponse, DidGuessRequest, FreshVocabRequest, FreshVocabResponse } from 'src/app/dto/dto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  // address: string = "localhost";
  address: string = "134.122.73.65";

  vocab: VocabResponse = {id: -1, polish: '', english: ''};
  isPolish: boolean = true;
  display: string = this.vocab.polish;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRandomVocab();
  } 

  submit(vocabForm: NgForm, submit) {
    console.log(vocabForm.value.Polish);
    console.log(vocabForm.value.English);
    let checked: boolean;
    if(vocabForm.value.start === "") {
      checked = false;
    } else {
      checked = vocabForm.value.start;
    }
    console.log(checked)
    let payload: FreshVocabRequest = 
    {
      polish: vocabForm.value.Polish,
      english: vocabForm.value.English,
      startNow: checked 
    }
    this.http.post<FreshVocabResponse>('http://' + this.address + ':8080/api/fresh', payload).subscribe(
      (val) => {
        console.log(val.message);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitPrint(vocabForm: NgForm, polModel: NgModel, engModel: NgModel) {
    console.log(vocabForm.value.Polish);
    console.log(vocabForm.value.English);
  }

  learnNewRandom() {
    this.http.get<VocabResponse>('http://' + this.address + ':8080/api/new').subscribe(
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
    this.http.post<VocabResponse>('http://' + this.address + ':8080/api/did-guess', payload).subscribe(
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
    this.http.get<VocabResponse>('http://' + this.address + ':8080/api/old').subscribe(
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
