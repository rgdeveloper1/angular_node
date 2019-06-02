import { Component, OnInit } from '@angular/core';
import { LoderService } from './loder.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(public loderService: LoderService) { }

  ngOnInit() {
  }

}
