import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import waitForExpect from 'wait-for-expect';

export default function shouldDisableFormAfterSubmit(
  formComponentName,
  options,
) {
  function checkButtonDisabled(wrapper, value) {
    expect(wrapper.find('button[type="submit"]').props().disabled).toBe(value);
  }

  describe.each([
    ['when success', { status: 200 }],
    ['when failed', { throws: { message: 'FETCH_ERROR' } }],
  ])('%s', (a, response) => {
    loadApiFetchMock(response);

    it('should disable submit when waiting for response', () => {
      const wrapper = options.configure();
      wrapper.find(formComponentName).instance().enable = () => {};
      options.fillInAndSubmitForm();

      wrapper.update();
      checkButtonDisabled(wrapper, true);
    });

    it('should enable submit after response received', async () => {
      const wrapper = options.configure();
      options.fillInAndSubmitForm();

      await waitForExpect(() => {
        wrapper.update();
        checkButtonDisabled(wrapper, false);
      });
    });
  });
}
