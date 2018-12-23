import React from 'react';
import WordsList from "../Words/WordsList";
import {shallow, mount, render} from 'enzyme';

describe('sum', () => {
    it('', () => {
        expect(1 + 2).toEqual(3)
    })

    it('to be true', () => {
        expect(true).toBeTruthy()
    })

    it('component mount shallow', () => {
        const wrapper = shallow(<WordsList />);
    })
})