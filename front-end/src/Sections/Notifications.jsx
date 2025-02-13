import React from 'react'
import { Left, List, ListItems, Right, Wrapper } from '../Style/Notification/Style';
import Typography from '../Style/Typography';
import N1 from '../../src/assets/images/n-1.jpg'
import N2 from '../../src/assets/images/n-2.jpg'
import N3 from '../../src/assets/images/n-3.jpg'
import N4 from '../../src/assets/images/n-4.jpg'
import { Figure, Image } from '../Style/GlobalStyle';

export default function Notifications() {
    return (
        <>
            <Wrapper>
                <List>
                    <ListItems>
                        <Left>
                            <Figure>
                                <Image src={N1} alt='' width={40} height={40} style={{ borderRadius: '50%' }} />
                            </Figure>
                        </Left>
                        <Right>
                            <Typography variant="p">Your resume
                                updated!</Typography>
                        </Right>
                    </ListItems>
                </List>

                <List>
                    <ListItems>
                        <Left>
                            <Figure>
                                <Image src={N2} alt='' width={40} height={40} style={{ borderRadius: '50%' }} />
                            </Figure>
                        </Left>
                        <Right>
                            <Typography variant="p">You changed
                                password</Typography>
                        </Right>
                    </ListItems>
                </List>

                <List>
                    <ListItems>
                        <Left>
                            <Figure>
                                <Image src={N3} alt='' width={40} height={40} style={{ borderRadius: '50%' }} />
                            </Figure>
                        </Left>
                        <Right>
                            <Typography variant="p">Your account has been
                                created successfully</Typography>
                        </Right>
                    </ListItems>
                </List>

                <List>
                    <ListItems>
                        <Left>
                            <Figure>
                                <Image src={N4} alt='' width={40} height={40} style={{ borderRadius: '50%' }} />
                            </Figure>
                        </Left>
                        <Right>
                            <Typography variant="p">You applied for a job
                                Front-end Developer</Typography>
                        </Right>
                    </ListItems>
                </List>
            </Wrapper>
        </>
    )
}
