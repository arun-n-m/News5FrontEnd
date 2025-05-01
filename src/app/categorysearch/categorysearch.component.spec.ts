import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorysearchComponent } from './categorysearch.component';

describe('CategorysearchComponent', () => {
  let component: CategorysearchComponent;
  let fixture: ComponentFixture<CategorysearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorysearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorysearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
