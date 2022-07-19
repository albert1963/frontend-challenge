import { Component, OnInit } from '@angular/core';
import {ApexOptions} from "../../component/chart/chart.component";
import {UtilsService} from "../../services/utils.service";
import {Volume} from "../../interfaces/volume";
import {Category} from "../../interfaces/category";

import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  categoryCtrl = new FormControl('250162');
  yearCtrl = new FormControl('');

  options! : ApexOptions ;
  categories : Category[] = [];
  years : string[] = [];


  averageSearches = 0;
  variationWithPreviousYear = '';


  constructor(private utilServ:UtilsService) { }



  ngOnInit(): void {
    // @ts-ignore
    this.utilServ.readFile("./assets/api/categories.json").subscribe((categories : Category[]) => {
      this.categories = categories;

      this.readByCategory( true) // firstCall of the function.
    })
  }




  readByCategory(firstCall = false){

    // Every time this function is called, let's reinitialise the variation and average search
    this.variationWithPreviousYear = '';
    this.averageSearches = 0;

    // The catId and year equal to the value of the formControl
    const catId = this.categoryCtrl.value;
    const year = this.yearCtrl.value;


    // @ts-ignore
    this.utilServ.readFile("./assets/api/volumes/"+catId+".json").subscribe((volumes : Volume[]) => {

      if(volumes.length > 0){
        // We need to fetch all the years in order to display it in a select option. However, we just have to do this one time
        if(firstCall){
          const firstYear = new Date(volumes[0].date).getFullYear()
          const lastYear = new Date(volumes[volumes.length - 1].date).getFullYear();

          for(let i = firstYear; i<= lastYear ; i++){
            this.years.push(i.toString());
          }

        }

        //as the volumes may change because of the upcoming filters, we need to store the initial volume.
        const allVolumes = volumes;

        //if the user has selected a year, we need to filter it here
        if(year) volumes = volumes.filter(v => new Date(v.date).getFullYear() === parseFloat(year));


        //We now need to calculate the average of of volumes
        this.averageSearches = volumes.reduce((accum, curr) =>  accum + curr.volume, 0) / volumes.length;
        this.averageSearches = parseInt(this.averageSearches.toString(),10); // i want to keep the integer number


        //Let's calculate the variation with the previous year now. To perform this,
        // the selected year must not be on the first position of the array.

        if(year && year !== this.years[0]){

          // Calculating old average
          const oldVolumes =  allVolumes.filter(a => new Date(a.date).getFullYear() === (parseFloat(year) - 1))
          const oldAverage = oldVolumes.reduce((accum, curr) =>  accum + curr.volume, 0) / oldVolumes.length;

          if(oldAverage > 0){
            const result =  ((this.averageSearches - oldAverage) / oldAverage).toFixed(2);
            this.variationWithPreviousYear = (parseFloat(result) * 100).toFixed(0);
          }

        }



        // displaying the graph
        // @ts-ignore
        const data:  number[] = volumes.map(volume => volume.volume);
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        this.options =  {
          series: [{
            data: data
          }],
          chart: {
            type: 'bar',
            height: 800
          },
          annotations: {
            xaxis: [{
              x: 100
            }],

          },
          plotOptions: {
            bar: {
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: true
          },
          xaxis: {
            categories: volumes.map(volume => new  Date(volume.date).toLocaleDateString('fr')),

          },
          grid: {
            xaxis: {
              lines: {
                show: true
              }
            }
          },
          yaxis: {
            reversed: false,
            axisTicks: {
              show: true
            }
          }
        }
      }

    })
  }

}
