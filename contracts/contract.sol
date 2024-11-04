// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract checkShotContract {
    int256 constant factor = 10 ** 6;

    function checkShot(
        int256 x,
        int256 y,
        int256 r
    ) public pure returns (bool) {
        require(
            r <= 5 * factor &&
                r > 0 &&
                x <= 5 * factor &&
                x >= -5 * factor &&
                y <= 5 * factor &&
                y >= -5 * factor,
            "Invalid data"
        );

        return
            (x >= 0 && y >= 0 && x * 2 <= r && y <= r) ||
            (x <= 0 && y >= 0 && -x + y <= r) ||
            (x >= 0 && y <= 0 && x * x + y * y <= r * r);
    }
}
