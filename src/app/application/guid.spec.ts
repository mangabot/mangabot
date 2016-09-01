/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import {Guid} from './guid';

describe('Guid', () => {
  it('should create an instance', () => {
    expect(new Guid()).toBeTruthy();
  });
});
