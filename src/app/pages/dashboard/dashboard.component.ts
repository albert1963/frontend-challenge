import { Component, OnInit } from '@angular/core';
import {ApexOptions} from "../../component/chart/chart.component";
import {UtilsService} from "../../services/utils.service";
import {Volume} from "../../interfaces/volume";
import {Category} from "../../interfaces/category";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options! : ApexOptions ;
  categories : Category[] = [];
  constructor(private utilServ:UtilsService) { }



  ngOnInit(): void {
    // @ts-ignore
    this.utilServ.readFile("../../../assets/api/volumes/250162.json").subscribe((volumes : Volume[]) => {
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

    })
  }


}
