import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discoveries',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './discoveries.component.html',
  styleUrl: './discoveries.component.css'
})
export class DiscoveriesComponent {

}
