import { shallowMount } from '@vue/test-utils';

import Entry from '@/modules/daybook/components/Entry.vue';

import { journalState } from '../../../../mock-data/test-journal-state.js';

describe('Entry component tests', () => {
  const mockRouter = {
    push: jest.fn(),
  };
  const mockEntry = journalState.entries[0];
  let wrapper = shallowMount(Entry, {
    props: {
      entry: mockEntry,
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should redirect at clicking inside the entry-container', () => {
    const entryContainer = wrapper.find('.entry-container');
    entryContainer.trigger('click');
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry',
      params: { id: mockEntry.id },
    });
  });

  it('should evaulate computed properties correctly', () => {
    const { yearDay, month, day } = wrapper.vm;
    console.log(yearDay);
    expect(day).toBe(15);
    expect(month).toBe('September');
    expect(yearDay).toBe('2021, Wednesday');
  });
});
