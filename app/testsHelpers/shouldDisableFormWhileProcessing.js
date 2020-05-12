/* global context */

import loadApiFetchMock from 'testsHelpers/loadApiFetchMock';
import waitForExpect from 'wait-for-expect';

export default function shouldDisableFormWhileProcessing(
  formComponentName,
  spinnerSelector,
  methods,
) {
  async function checkButtonDisabled(wrapper, value) {
    await waitForExpect(() => {
      component.update();
      expect(component.find('button[type="submit"]').props().disabled).toBe(
        value,
      );
    });
  }

  async function checkSpinnerPresence(wrapper, value) {
    await waitForExpect(() => {
      component.update();
      expect(component.exists(spinnerSelector)).toBe(value);
    });
  }

  let component;
  let wrapper;

  describe('should have submit disable implemented for fetching form', () => {
    context.each([
      ['when success', { status: 200 }],
      ['when failed', { throws: { message: 'FETCH_ERROR' } }],
    ])('%s', (a, response) => {
      loadApiFetchMock(response);

      context('when waiting for response', () => {
        beforeEach(async () => {
          wrapper = await methods.configureWrapper();
          component = wrapper.find(formComponentName);
          methods.fillInAndSubmitForm();
        });

        it('should disable submit', () => {
          checkButtonDisabled(wrapper, true);
        });

        it('should render spinner', () => {
          checkSpinnerPresence(wrapper, true);
        });
      });

      context('after response received', () => {
        beforeEach(async () => {
          wrapper = await methods.configureWrapper();
          methods.fillInAndSubmitForm();
        });

        it('should enable submit', async () => {
          await waitForExpect(() => {
            checkButtonDisabled(wrapper, false);
          });
        });

        it('should hide spinner', async () => {
          await waitForExpect(() => {
            checkSpinnerPresence(wrapper, false);
          });
        });
      });
    });
  });
}
