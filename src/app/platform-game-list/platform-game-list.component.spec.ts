import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformgameListComponent } from './platform-game-list.component';

describe('PlatformGameListComponent', () => {
  let component: PlatformgameListComponent;
  let fixture: ComponentFixture<PlatformgameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformgameListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformgameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
