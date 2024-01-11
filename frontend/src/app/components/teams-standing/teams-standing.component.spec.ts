import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsStandingComponent } from './teams-standing.component';

describe('TeamsStandingComponent', () => {
  let component: TeamsStandingComponent;
  let fixture: ComponentFixture<TeamsStandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamsStandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamsStandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
