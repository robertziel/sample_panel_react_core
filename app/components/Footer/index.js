import React from 'react';
import { FormattedMessage } from 'react-intl';

import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <div className="message">
          <FormattedMessage
            {...messages.authorMessage}
            values={{
              author: (
                <a href="https://robertz.co" target="_blank">
                  Robert Zieliński
                </a>
              ),
            }}
          />
        </div>
      </section>
    </Wrapper>
  );
}

export default Footer;
