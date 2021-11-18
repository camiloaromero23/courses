import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import EntryList from '@/modules/daybook/components/EntryList.vue';
import journal from '@/modules/daybook/store/journal';

import { journalState } from '../../../../mock-data/test-journal-state';

const createVuexStore = initialState =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe('EntryList component tests', () => {
  const store = createVuexStore(journalState);

  const mockRouter = { push: jest.fn() };

  let wrapper;

  beforeEach(async () => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      props: {},
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  it('should call getEntriesByTerm and show 2 entries', () => {
    expect(wrapper.findAll('entry-stub').length).toBe(2);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should call getEntriesByTerm and filter entries', async () => {
    const input = wrapper.find('input');
    await input.setValue('Halo');
    expect(wrapper.findAll('entry-stub').length).toBe(1);
  });

  it('should redirect once the new button is clicked to /new', () => {
    wrapper.find('button').trigger('click');
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry',
      params: { id: 'new' },
    });
  });
});
