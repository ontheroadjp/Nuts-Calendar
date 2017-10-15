/**
 * Helper function for the vuex action testing
 *
 * @param { string } action action name
 * @param { object } payload attributes of the action
 * @param { object } context attributes of the action
 * @param { array } expected expected mutations and dispaches ex.[{ type:'insert', payload:{id: 123} }]
 * @param { object } done
 */
export const testAction = (action, payload, context, expected, done) => {
    let count = 0;

    // commit mock
    context.commit = (type, payload) => {
        const expectation = expected[count];

        try {
            expect(expectation.type).to.equal(type);
            if (payload) expect(expectation.payload).to.deep.equal(payload);

        } catch (error) {
            done(error);
        }

        count++
        if (count >= expected.length) done();
    };

    // commit mock
    context.dispatch = (type, payload) => {
        const expectation = expected[count];

        try {
            expect(expectation.type).to.equal(type);
            if (payload) expect(expectation.payload).to.deep.equal(payload);

        } catch (error) {
            done(error);
        }

        count++
        if (count >= expected.length) done();
    };

    // call action
    action(context, payload);

    // check that all mutations and dispachers are called
    if (expected.length === 0 ) {
        expect(count).to.equal(0);
        done();
    }
};
