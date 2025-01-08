import React, { useState, useEffect } from 'react'
import { Container, InnerWrapper, Wrapper, Box, Heading, Text, List, ListItems, Div } from '../../style/beesTypes/Style'
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import QueenGraph from './QueenGraph';


function TabPanel({ children, value, index }) {
    return (
        <>
            <div hidden={value !== index}>
                {value === index && (
                    <InnerWrapper>
                        {children}
                    </InnerWrapper>
                )}
            </div>
        </>
    );
}

export default function BeesTypes() {
    const [queenTab, setQueenTab] = React.useState(0);
    const [workerTab, setWorkerTab] = React.useState(0);
    const [droneTab, setDroneTab] = React.useState(0);

    const [tabChangeClass, setTabChangeClass] = useState('');

    const handleQueenChange = (event, newValue) => {
        setQueenTab(newValue);
    };

    const handleWorkerChange = (event, newValue) => {
        setWorkerTab(newValue);
    };

    const handleDroneChange = (event, newValue) => {
        setDroneTab(newValue);
    };

    // Apply the animation class when the tab changes
    useEffect(() => {
        setTabChangeClass('tab-change-animation');
        const timeout = setTimeout(() => {
            setTabChangeClass(''); // Remove the animation class after it completes
        }, 300); // Duration of the animation
        return () => clearTimeout(timeout); // Cleanup on component unmount or before next tab change
    }, [queenTab]);

    return (
        <Container>
            <Heading>The Three Bees - Types of honey bees in this hive</Heading>
            <Text>There are different types of bees in a honey bee hive: Worker, Drone and Queen. Each has its own important roles and performs specific duties in a bee colony.</Text>
            <Wrapper>


                <Box>
                    <AppBar position="static" className='app-bar'>
                        <Tabs value={queenTab} onChange={handleQueenChange} aria-label="Queen Bee Tabs">
                            <Tab className={tabChangeClass} label="Bee Insights"

                            />
                            <Tab className={tabChangeClass} label="Bee Analytics" />
                            <Tab className={tabChangeClass} label="3D Bee Model" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={queenTab} index={0}>
                        <Div style={{ minHeight: '547px' }}>
                            <Heading>Queen bee?</Heading>
                            <Text>She can be recognized by her abdomen, which is usually smooth and elongated, extending well beyond her folded wings.</Text>
                            What is the queen bee's role?
                            Her function in the hive is one of production. She is normally the only reproductive female in the colony. Egg-laying begins in early spring, initiated when the first fresh pollen is brought home by the workers. Egg production will continue until fall, or as long as pollen is available.
                            At the height of her productivity, the queen could lay as many as 2000 eggs each day. A queen bee can live for up to five years, but her period of usefulness rarely exceeds two or three years. Younger queens produce many more eggs, and older ones may produce excessive drones. Many beekeepers re-queen their colonies every year or two. Older queens are often superseded (replaced) by the workers without any assistance, or even knowledge, of the beekeeper. Good quality queens can be reared by an experienced beekeeper, but a beginner will usually do better to buy good queens from a reputable producer.

                            <Heading> Queen current role?</Heading>
                            <Text>Her function in the hive is one of production. She is normally the only reproductive female in the colony. Egg-laying begins in early spring, initiated when the first fresh pollen is brought home by the workers. Egg production will continue until fall, or as long as pollen is available.

                                At the height of her productivity, the queen could lay as many as 2000 eggs each day. A queen bee can live for up to five years, but her period of usefulness rarely exceeds two or three years. Younger queens produce many more eggs, and older ones may produce excessive drones. Many beekeepers re-queen their colonies every year or two. Older queens are often superseded (replaced) by the workers without any assistance, or even knowledge, of the beekeeper. Good quality queens can be reared by an experienced beekeeper, but a beginner will usually do better to buy good queens from a reputable producer.</Text>
                            <Heading>Queen's substance?</Heading>
                            <Text>Queen bees also produce a pheromone known as queen substance. This mixture of chemicals is passed individually from bee to bee throughout the entire hive as they share food. If a queen bee is removed from a colony, the workers will notice her absence within several hours because of the drop in the level of this pheromone. This queenless state quickly initiates the urge to rear a new "emergency" queen from the youngest available larvae (1-3 days old). The presence of this pheromone also inhibits the development of the workers' ovaries. After a period of queenlessness, some may become laying workers. Workers also evaluate their queen based on the quantity of the pheromones she produces. If workers begin to receive an insufficient dose each day, they may perceive her as poor quality, and begin making preparations to supersede her. Beekeepers often mark the queen's thorax with a dot of paint to make her easy to find, and to determine if she has been replaced. </Text>
                        </Div>
                    </TabPanel>
                    <TabPanel value={queenTab} index={1}>
                        <Div style={{ minHeight: '547px' }}>
                            <QueenGraph/>
                        </Div>
                    </TabPanel>
                    <TabPanel value={queenTab} index={2}>
                        <Div style={{ minHeight: '547px' }}></Div>
                    </TabPanel>


                </Box>

                <Box>
                    <AppBar position="static" className='app-bar'>
                        <Tabs value={workerTab} onChange={handleWorkerChange} aria-label="Worker Bee Tabs">
                            <Tab label="Bee Insights" />
                            <Tab label="Bee Analytics" />
                            <Tab label="3D Bee Model" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={workerTab} index={0}>
                        <Div>
                            <Heading>Worker bees?</Heading>
                            <Text>Workers are the smallest of the bee castes, but are by far the most numerous. All workers are female, and normally incapable of reproduction. They are unable to mate, but in a hopelessly queenless colony, workers may begin to lay unfertilized eggs, which develop into drones.</Text>
                            <Text>Workers do all of the necessary tasks within a colony including:</Text>
                            <List>
                                <ListItems>They secrete the wax used in the hive, and form it into honeycombs.</ListItems>
                                <ListItems> They forage for all of the nectar and pollen brought into the hive, and transform the nectar into honey.</ListItems>
                                <ListItems>  They produce royal jelly to feed to the queen and young larvae.</ListItems>
                                <ListItems>   They also tend to the needs of the larvae and queens.</ListItems>
                                <ListItems>   They cap the cells of mature larvae for pupation and remove debris and dead bees from the hive.</ListItems>
                                <ListItems>   Worker bees defend the hive against intruders and maintain optimal conditions by heating, cooling and ventilating the hive.</ListItems>
                            </List>

                            <Text>Workers have well-developed compound eyes on the sides of their heads, and three simple eyes (ocelli) at the vertex. Their tongue is well developed and elongated for taking up nectar from flowers.</Text>
                            <Heading>Bee lifespan</Heading>
                            <Text>Workers reared in the spring and early summer tend to live for five to six weeks. The first two weeks of their lives is spent as house bees, doing tasks in the hive. The remainder of their time is spent as field bees, foraging for food outside the hive. Workers that reach maturity in the late fall may live well into the following spring. They must maintain a cluster of bodies around the queen bee, keeping her warm through the winter months. Later, when egg-laying resumes, they must raise the first generation of young bees the next year. </Text>
                        </Div>
                    </TabPanel>
                    <TabPanel value={workerTab} index={1}></TabPanel>
                    <TabPanel value={workerTab} index={2}></TabPanel>

                </Box>

                <Box>
                    <AppBar position="static" className='app-bar'>
                        <Tabs value={droneTab} onChange={handleDroneChange} aria-label="Drone Bee Tabs">
                            <Tab label="Bee Insights" />
                            <Tab label="Bee Analytics" />
                            <Tab label="3D Bee Model" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={droneTab} index={0}>
                        <Div>
                            <Heading>Drones?</Heading>
                            <Text>Drones are the male honey bees. The only function of a drone is to fertilize a young queen bee</Text>
                            <List>
                                <ListItems>They are visibly larger and stouter than workers.</ListItems>
                                <ListItems>   They possess large distinctive eyes that meet on the top of their heads, and have antennae slightly longer than the workers or queen.</ListItems>
                                <ListItems>    Their mouth parts are generally reduced.</ListItems>
                                <ListItems>     Drones develop from unfertilized eggs, and drone cells are visibly larger than those of workers.</ListItems>
                                <ListItems>     Drones do not tend the brood, produce wax, or collect pollen or nectar. They will feed themselves directly from honey cells in the hive, or beg food from worker bees.</ListItems>
                                <ListItems>     They are reared chiefly in the spring and summer, beginning about four weeks before new queens are produced, thus ensuring that ample drones will be available to mate with emerging queens.</ListItems>
                                <ListItems>      Their day is typically divided between periods of eating and resting, and patrolling mating sites known as drone congregation areas.</ListItems>

                                <ListItems>Drone production will cease in the late summer, as the quantity of available food declines. Before winter, the drones are usually driven out of the hive by workers, who guard against their return. A colony that has lost its queen may develop laying workers, who can produce only drones. When this occurs, the colony is effectively doomed. The production of many drones, therefore, will be their final effort to pass on the colony's genetic line by mating with a virgin queen from another colony.</ListItems>
                            </List>
                        </Div>
                    </TabPanel>
                    <TabPanel value={droneTab} index={1}></TabPanel>
                    <TabPanel value={droneTab} index={2}></TabPanel>
                </Box>

            </Wrapper>
        </Container>
    )
}
