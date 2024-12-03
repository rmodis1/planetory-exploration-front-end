import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MissionsComponent } from './missions/missions.component';
import { DiscoveriesComponent } from './discoveries/discoveries.component';
import { PlanetsComponent } from './planets/planets.component';
import { MissionsListComponent } from './missions/missions-list/missions-list.component';
import { UpdateMissionComponent } from './missions/missions-list/update-mission/update-mission.component';
import { DeleteMissionComponent } from './missions/missions-list/delete-mission/delete-mission.component';

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'home', component: HomeComponent},
    {path: 'missions', component: MissionsComponent},
    {path: 'missions/list', component: MissionsListComponent},
    {path: 'missions/update/:id', component: UpdateMissionComponent },
    {path: 'missions/delete/:id', component: DeleteMissionComponent},
    {path: 'discoveries', component: DiscoveriesComponent},
    {path: 'planets', component: PlanetsComponent},
    {path: '**', component: AppComponent, pathMatch: 'full'},
];
