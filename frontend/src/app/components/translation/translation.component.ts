import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss'
})
export class TranslationComponent implements OnInit{
  sourceLanguage = 'en';
  targetLanguage = 'id';
  textToTranslate = '';
  translationResult: string | undefined;
  supportedLanguages: any[] = [
    { code: 'id', name: 'Indonesian' },
  ];
  loading: boolean = false;

  ngOnInit(): void {
    this.getAggregatedData()
  }

  constructor(private translationService: TranslationService, private teamsService: TeamsService) {}

  translate() {
    this.loading = true;
    this.translationService
      .translateText(this.sourceLanguage, this.targetLanguage, this.textToTranslate)
      .subscribe(
        (result: any) => {
          this.translationResult = result.data.translatedText;
          console.log(this.translationResult)
          this.loading = false;
        },
        (error) => {
          console.error('Translation error:', error);
          // Handle error as needed
        }
      );
  }

  getAggregatedData() {
    this.teamsService.getAggregatedInfo().subscribe( res => {
      console.log(res.languages.data.languages);
      this.supportedLanguages = res.languages.data.languages;
    })
  }

}
