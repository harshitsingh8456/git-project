import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchHeaderComponent } from './branch-header.component';

describe('BranchHeaderComponent', () => {
  let component: BranchHeaderComponent;
  let fixture: ComponentFixture<BranchHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
