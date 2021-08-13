import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision';

describe('Indecision Component', () => {
  let wrapper;
  let consoleSpy;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: 'yes',
          forced: false,
          image: 'https://yesno.wtf/assets/yes/2.gif',
        }),
    }),
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    consoleSpy = spyOn(console, 'log');
    jest.clearAllMocks();
  });

  test('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should not trigger anything if something is written in the input (console.log)', async () => {
    const input = wrapper.find('input');
    const getAnswerSpy = spyOn(wrapper.vm, 'getAnswer');

    await input.setValue('Hello World');

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test('should trigger fetch if "?" is written in the input', async () => {
    const input = wrapper.find('input');
    const getAnswerSpy = spyOn(wrapper.vm, 'getAnswer');

    await input.setValue('Hello World?');

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(getAnswerSpy).toHaveBeenCalledTimes(1);
  });

  test('should update the state after calling getAnswer', async () => {
    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');

    expect(img.exists()).toBeTruthy();

    expect(wrapper.vm.image).toBe('https://yesno.wtf/assets/yes/2.gif');

    expect(wrapper.vm.fixedAnswer).toBe('YES!!!');
  });

  test('should behave appropiately after failures in the API', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));

    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');
    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe('Could not find the API');
  });
});
