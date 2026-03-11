import { Routes } from '@angular/router';
import { Index } from './pages/index';
import { ProjectsComponent } from './pages/projects/projects';
import { AboutComponent } from './pages/about/about';


export const routes: Routes = [
    { path: "", loadComponent: () => Index },
    { path: 'projects', loadComponent: () => ProjectsComponent },
    { path: 'about', loadComponent: () => AboutComponent },

];
