import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByLetterComponent } from './search-by-letter.component';

describe('SearchByLetterComponent', () => {
  let component: SearchByLetterComponent;
  let fixture: ComponentFixture<SearchByLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByLetterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
