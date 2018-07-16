/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenifestComponent } from './menifest.component';

describe('MenifestComponent', () => {
  let component: MenifestComponent;
  let fixture: ComponentFixture<MenifestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenifestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenifestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
