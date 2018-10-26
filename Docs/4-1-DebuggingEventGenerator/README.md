## Debugging event generator app

We found an issue with the event generator that would show false positives. In below chart you can see that there was an event generated although the values of all three phases were at the same level most of the times.

(False Positive Event)[falsepositiveevent.png]

We assume, that this is due to the fact, that for any 2 minute interval it might well be that one phases is in average below 32 and one of the others is above 32. but only very slightly: 31.9 vs 32.1.

To remedy this we introduced a minimum delta. of 10 amps. and changed the condition in the code from

    			if((thing.CurrentPhase1b_AVG > 32 || thing.CurrentPhase2b_AVG > 32 || thing.CurrentPhase3b_AVG > 32) &&
    				(thing.CurrentPhase1b_AVG < 32 || thing.CurrentPhase2b_AVG < 32 || thing.CurrentPhase3b_AVG < 32)) {

    				to

    			if((thing.CurrentPhase1b_AVG > 32 || thing.CurrentPhase2b_AVG > 32 || thing.CurrentPhase3b_AVG > 32) &&
    				(thing.CurrentPhase1b_AVG < 22 || thing.CurrentPhase2b_AVG < 22 || thing.CurrentPhase3b_AVG < 22)) {

This should avoid this kind of problem in the future.

To deploy the new version I used cf push. This way there was a short down time of the app but in this cases this is ok.
