import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MissionsComponent } from './missions/missions.component';
import { PlanetsComponent } from './planets/planets.component';
import { MissionsListComponent } from './missions/missions-list/missions-list.component';
import { UpdateMissionComponent } from './missions/missions-list/update-mission/update-mission.component';
import { DeleteMissionComponent } from './missions/missions-list/delete-mission/delete-mission.component';
import { GetDiscoveriesComponent } from './discoveries/get-discoveries/get-discoveries.component';
import { DiscoveriesComponent } from './discoveries/discoveries.component';
import { AddDiscoveryComponent } from './discoveries/add-discovery/add-discovery.component';
import { DiscoveryTypesComponent } from './discoveries/discovery-types/discovery-types.component';
import { UpdateDiscoveryComponent } from './discoveries/update-discovery/update-discovery.component';

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'home', component: HomeComponent},
    {path: 'missions', component: MissionsComponent},
    {path: 'missions/list', component: MissionsListComponent},
    {path: 'missions/update/:id', component: UpdateMissionComponent },
    {path: 'missions/delete/:id', component: DeleteMissionComponent},
    {path: 'discoveries', component: DiscoveriesComponent},
    {path: 'discoveries/get-discoveries', component: GetDiscoveriesComponent},
    {path: 'discoveries/add-discovery', component: AddDiscoveryComponent},
    {path: 'discoveries/discovery-types', component: DiscoveryTypesComponent},
    // {path: 'discoveries/:id', component: GetDiscoveryComponent},
    {path: 'discoveries/update/:id', component: UpdateDiscoveryComponent},
    // {path: 'discoveries/:id/delete', component: DeleteDiscoveryComponent},
    {path: 'planets', component: PlanetsComponent},
    {path: '**', component: AppComponent, pathMatch: 'full'},
];
