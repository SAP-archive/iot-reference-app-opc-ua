# Data analysis

## Initial data analysis

We got data for 2 days initially shown below.

After some tweaking of the Sensor Chart, we could compare the 3 phases values using the chart. In some cases we had to put 2 sensor charts next to each other to compare different times for the same thing with each other.

![Image]("feb7morning.png")

We observed the following in these measurements:

Between 5:30 am local time and 7:20 no data was collected (straight line from 0), we need to find out what is going on here.

At 7:20, Phase 2 and 3 are at about the same level but 3 is 3 Amps lower - maybe the heating elements connected to phase 3 consume less power/have higher resistance > check with manufacturer.

Between 7:36 and 8:30 the phases seem to work independently from each other. 
Is this someone turning the heat up and down ?
But why then do all of them change eratically ?

	1. phase 1 is all the way up and phase 2 and 3 0
	2. phase 1 goes down and 2 and 3 move to double of phase 1 value
	3. phase 3 goes down and phase 1 and 2 move to double of phase 1 value

Theory: When turing the knob here are different combinations of phases active Y to be checked with fingerprinting.
Only at the end of these episodes we see the familiar pattern again of all of them beeing at their top.

Do we really have a good timestamp we create on the device? can we rely on it? (the distance between measurements seems to be sometimes 3 seconds sometimes half a second.)

![Image]("feb7aroundnoon.png")

Here we guess that keeping food heated might trigger the full power every 15 minutes based on temperature of the food beeing measured.

Across all of the recordings we saw no values higher then around 36 amps - so we assume this is full throttle > do a fingerprint run where we control the machine, check with the manufacturer of the machine

We decided to create a notification app, that would create an event, when the fingerprint of the 3 currents is not close to each other anymore (at least one is at 36 and one or more is below 32). To avoid to have timing issues when turnign up the power we decided that we use a 2 minute time window.

## On going data analysis

We have to analyse the data aquired at least every week (if not every day) in the first period of production use.