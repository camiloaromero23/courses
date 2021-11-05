import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import EntryView from '@/modules/daybook/views/EntryView.vue';
import journal from '@/modules/daybook/store/journal';

import { journalState } from '../../../../mock-data/test-journal-state';

import Swal from 'sweetalert2';

const createVuexStore = initialState =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe('EntryView tests', () => {
  const store = createVuexStore(journalState);
  store.dispatch = jest.fn();

  const mockRouter = { push: jest.fn() };

  let wrapper;

  beforeEach(async () => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: '-MjXVqVZAR54aeePmb7I',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  it('should logout user because id not exists', () => {
    shallowMount(EntryView, {
      props: {
        id: 'Non-existing id',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'noEntry' });
  });

  it('should show the entry correctly', () => {
    expect(mockRouter.push).not.toHaveBeenCalledWith({ name: 'noEntry' });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should delete the entry and logout', done => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));

    wrapper.find('.btn-danger').trigger('click');

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Are you sure?',
      text: 'Once deleted, cannot be recovered',
      showDenyButton: true,
      confirmButtonText: "Yes, I'm sure",
    });

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        'journal/deleteEntry',
        '-MjXVqVZAR54aeePmb7I',
      );
      expect(mockRouter.push).toHaveBeenCalled();
      done();
    }, 1);
  });
});
