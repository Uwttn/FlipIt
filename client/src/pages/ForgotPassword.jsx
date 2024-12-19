
// function to reset password through typing an email, and receiving a token

function redeemToken(email, passwordResetToken, newPassword) {

email = "";
hashedToken = hash_sha256(passwordResetToken);
    rowFromDb = db.getRowTheContains(hashedToken)
    if (rowFromDb == null) {
        throw Error("invalid password reset token")
    }
    userId = rowFromDb.user_id
    /*
    Now we know that the token exists, so it is valid. We start a transaction to prevent race conditions.
    */
    db_startTransaction() {
        /* allTokensForUser is an array of db rows. We have to use a query that locks all the rows in the table that belong to this userId. We can use something like "SELECT * FROM password_reset_tokens where user_id = userId FOR UPDATE". The "FOR UPDATE" part locks all the relevant rows. */
        allTokensForUser = db_getAllTokensBasedOnUser(userId)
        /*
        We search for the row that matches the input token's hash, so that we know that another transaction has not redeemed it already.
        */
        matchedRow = null;
        allTokensForUser.forEach(row => {
            if(row.token == hashedToken) {
                matchedRow = row;
            }
        });
        if (matchedRow == null) {
            /* The token was redeemed by another transaction. So we exit */
            throw Error("invalid password reset token")
        }
        /*
        Now we will delete all the tokens belonging to this user to prevent duplicate use
        */
        db_deleteAllRowsForUser(userId)
        /*
        Now we check if the current token has expired or not.
        */
        if (matchedRow.token_expiry < time_now()) {
            db_rollback();
            throw Error("Token has expired. Please try again");
        }
        /* Now all checks have been completed. We can change the user's password */
        hashedAndSaltedPassword = hashAndSaltPassword(newPassword);
        db_saveNewPassword(userId, hashedAndSaltedPassword);
        db_commitTransaction();
    }
}