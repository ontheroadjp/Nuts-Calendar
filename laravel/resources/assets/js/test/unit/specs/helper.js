export const testAction = (action, payload, context, expectedMutations, expectedDispatchers, done) => {
    let commitCount = 0;
    let dispatchCount = 0;

    // commit mock
    context.commit = (type, payload) => {
        const mutation = expectedMutations[commitCount]

        try {
            expect(mutation.type).to.equal(type)
            if (payload) {
                expect(mutation.payload).to.deep.equal(payload)
            }
        } catch (error) {
            done(error)
        }

        commitCount++
        if (commitCount >= expectedMutations.length) {
            done()
        }
    };

    // dispatch mock
    context.dispatch = (type, payload) => {
        const dispatcher = expectedDispatchers[dispatchCount]

        try {
            expect(dispatcher.type).to.equal(type)
            if (payload) {
                expect(dispatcher.payload).to.deep.equal(payload)
            }
        } catch (error) {
            done(error)
        }

        dispatchCount++
        if (dispatchCount >= expectedDispatchers.length) {
            done()
        }
    };

    // call action
    action(context, payload)

    // check that all mutations and dispachers are called
    if (expectedMutations.length === 0 && expectedDispatchers.length === 0) {
        expect(commitCount).to.equal(0)
        expect(dispatchCount).to.equal(0)
        done()
    }
}
