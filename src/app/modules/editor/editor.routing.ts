import { Routes, RouterModule } from '@angular/router';
import { TextEditorWrapperComponent } from './components/text-editor/text-editor.component';
import { MainPageComponent } from './components/main/main-page/main-page.component.ts';
import { PageNotFoundComponent } from './components/shared/not-found.component';

const appRoutes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'text-editor/:book', component: TextEditorWrapperComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
