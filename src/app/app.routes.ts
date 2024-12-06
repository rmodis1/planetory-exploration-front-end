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
import { DeleteDiscoveryComponent } from './discoveries/delete-discovery/delete-discovery.component';
import { AddPlanetComponent } from './planets/add-planet/add-planet.component';
import { GetPlanetsComponent } from './planets/get-planets/get-planets.component';
import { UpdatePlanetComponent } from './planets/update-planet/update-planet.component';
import { DeletePlanetComponent } from './planets/delete-planet/delete-planet.component';

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
    // {path: 'discoveries/discovery-types', component: DiscoveryTypesComponent},
    {path: 'discoveries/update/:id', component: UpdateDiscoveryComponent},
    {path: 'discoveries/delete/:id', component: DeleteDiscoveryComponent},
    {path: 'planets', component: PlanetsComponent},
    {path: 'planets/add-planet', component: AddPlanetComponent},
    {path: 'planets/get-planets', component: GetPlanetsComponent},
    {path: 'planets/update/:id', component: UpdatePlanetComponent},
    {path: 'planets/delete/:id', component: DeletePlanetComponent},
    {path: '**', component: AppComponent, pathMatch: 'full'},
];
