import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformGameListComponent } from './platform-game-list.component';

describe('PlatformGameListComponent', () => {
  let component: PlatformGameListComponent;
  let fixture: ComponentFixture<PlatformGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformGameListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatformGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
