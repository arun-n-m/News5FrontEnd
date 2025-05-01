import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BlogviewComponent } from './blogview/blogview.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from '../guards/auth.guard';
import { SearchComponent } from './search/search.component';
import { CreateComponent } from './create/create.component';
import { CategorysearchComponent } from './categorysearch/categorysearch.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [

    {
        path: '', component: HeaderComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full', },
            { path: 'home', component: HomeComponent },
            { path: 'view/:id', component: BlogviewComponent },
            { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
            { path: 'search', component: SearchComponent },
            { path: 'create', component: CreateComponent, canActivate: [authGuard] },
            { path: 'category/:category', component: CategorysearchComponent },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }

];
