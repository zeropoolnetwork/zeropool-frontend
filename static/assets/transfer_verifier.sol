pragma solidity ^0.6.0;
library Pairing {
    uint256 constant PRIME_Q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
    struct G1Point {
        uint256 X;
        uint256 Y;
    }
    // Encoding of field elements is: X[0] * z + X[1]
    struct G2Point {
        uint256[2] X;
        uint256[2] Y;
    }
    /*
        * @return The negation of p, i.e. p.plus(p.negate()) should be zero.
        */
    function negate(G1Point memory p) internal pure returns (G1Point memory) {
        // The prime q in the base field F_q for G1
        if (p.X == 0 && p.Y == 0) {
            return G1Point(0, 0);
        } else {
            return G1Point(p.X, PRIME_Q - (p.Y % PRIME_Q));
        }
    }
    /*
        * @return r the sum of two points of G1
        */
    function plus(
        G1Point memory p1,
        G1Point memory p2
    ) internal view returns (G1Point memory r) {
        uint256[4] memory input;
        input[0] = p1.X;
        input[1] = p1.Y;
        input[2] = p2.X;
        input[3] = p2.Y;
        bool success;
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            success := staticcall(sub(gas(), 2000), 6, input, 0xc0, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success, "pairing-add-failed");
    }
    /*
        * @return r the product of a point on G1 and a scalar, i.e.
        *         p == p.scalar_mul(1) and p.plus(p) == p.scalar_mul(2) for all
        *         points p.
        */
    function scalar_mul(G1Point memory p, uint256 s) internal view returns (G1Point memory r) {
        uint256[3] memory input;
        input[0] = p.X;
        input[1] = p.Y;
        input[2] = s;
        bool success;
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            success := staticcall(sub(gas(), 2000), 7, input, 0x80, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success, "pairing-mul-failed");
    }
    /* @return The result of computing the pairing check
        *         e(p1[0], p2[0]) *  .... * e(p1[n], p2[n]) == 1
        *         For example,
        *         pairing([P1(), P1().negate()], [P2(), P2()]) should return true.
        */
    function pairing(
        G1Point memory a1,
        G2Point memory a2,
        G1Point memory b1,
        G2Point memory b2,
        G1Point memory c1,
        G2Point memory c2,
        G1Point memory d1,
        G2Point memory d2
    ) internal view returns (bool) {
        G1Point[4] memory p1 = [a1, b1, c1, d1];
        G2Point[4] memory p2 = [a2, b2, c2, d2];
        uint256 inputSize = 24;
        uint256[] memory input = new uint256[](inputSize);
        for (uint256 i = 0; i < 4; i++) {
            uint256 j = i * 6;
            input[j + 0] = p1[i].X;
            input[j + 1] = p1[i].Y;
            input[j + 2] = p2[i].X[0];
            input[j + 3] = p2[i].X[1];
            input[j + 4] = p2[i].Y[0];
            input[j + 5] = p2[i].Y[1];
        }
        uint256[1] memory out;
        bool success;
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            success := staticcall(sub(gas(), 2000), 8, add(input, 0x20), mul(inputSize, 0x20), out, 0x20)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success, "pairing-opcode-failed");
        return out[0] != 0;
    }
}
contract TransferVerifier {
    uint256 constant SNARK_SCALAR_FIELD = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    uint256 constant PRIME_Q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
    using Pairing for *;
    struct VerifyingKey {
        Pairing.G1Point alfa1;
        Pairing.G2Point beta2;
        Pairing.G2Point gamma2;
        Pairing.G2Point delta2;
        Pairing.G1Point[6] IC;
    }
    struct Proof {
        Pairing.G1Point A;
        Pairing.G2Point B;
        Pairing.G1Point C;
    }
    function verifyingKey() internal pure returns (VerifyingKey memory vk) {
        vk.alfa1 = Pairing.G1Point(186000256485961913260032435894286505570990616187164262076043813620149619273, 7976122736846721946449706313918540682219246891787609996934945344959328922881);
        vk.beta2 = Pairing.G2Point([uint256(377536353097951578464425530866378765312218785155511954698136807687804184191), 8215192186278309212977672964919920320597910334018068809070793779527734204038], [uint256(1506710306625306753018216917314733833481748751542286692116147414353285200992), 10454779687280914460428269163698766019546271025978500591945835390097562528120]);
        vk.gamma2 = Pairing.G2Point([uint256(3174174399303125844361635926757358484100304444166838737546340352810255521688), 17378457256267702602144977337138551793740822176617810127491780316895647694662], [uint256(10372149205871265362314590817385610008769551572100698775357708550685742326603), 4566563112905619371132486376205611636198745364187374336492514542769540266370]);
        vk.delta2 = Pairing.G2Point([uint256(3006909150431959165056858386519985408959524107158372280187746457604166177362), 7535913978770846136596525766040345127760706711258021729035593415249837278393], [uint256(11159764269352831871554608057063512238633826677294842020875457149554617266361), 21226309774083602480419323774304198591593535534124610185493365840872285377396]);
        vk.IC[0] = Pairing.G1Point(16710380565017834517831712618636732485618327129766749470464628955182084635688, 6482893111451192884601606718621044736451217657912685442615493693548095531428);
        vk.IC[1] = Pairing.G1Point(8602788636391690181220615227442312605647427672438139457946051459064574880092, 19157728168469654212975542045600176737769833943527361556663289241252829286122);
        vk.IC[2] = Pairing.G1Point(2147394548050196998763266800546625457774663950494140554815588366133808786252, 6231204499551165507229578545527701701481883426319561294118087193691056749434);
        vk.IC[3] = Pairing.G1Point(10689459845676180454711676970331069280619200729204564984605684997947554177665, 378869831542442493004279000960156097433437949987129801921757806224440207511);
        vk.IC[4] = Pairing.G1Point(3436442949466391846859104965440702247899002522638864905051607849022668747516, 14743617765728976606166265895648044005844246035943773655801482660733441114365);
        vk.IC[5] = Pairing.G1Point(5259723915335245521379904124165761581986325095535400129172914563759888570490, 1499752445018069336133969777810082769019500672930662062548496399650456433719);

    }
    /*
        * @returns Whether the proof is valid given the hardcoded verifying key
        *          above and the public inputs
        */
    function verifyProof(
        uint256[5] memory input,
        uint256[8] memory p
    ) public view returns (bool) {
 
        // Make sure that each element in the proof is less than the prime q
        for (uint8 i = 0; i < p.length; i++) {
            require(p[i] < PRIME_Q, "verifier-proof-element-gte-prime-q");
        }
        Proof memory _proof;
        _proof.A = Pairing.G1Point(p[0], p[1]);
        _proof.B = Pairing.G2Point([p[3], p[2]], [p[5], p[4]]);
        _proof.C = Pairing.G1Point(p[6], p[7]);
        VerifyingKey memory vk = verifyingKey();
        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);
        vk_x = Pairing.plus(vk_x, vk.IC[0]);
        // Make sure that every input is less than the snark scalar field
        for (uint256 i = 0; i < input.length; i++) {
            require(input[i] < SNARK_SCALAR_FIELD, "verifier-gte-snark-scalar-field");
            vk_x = Pairing.plus(vk_x, Pairing.scalar_mul(vk.IC[i + 1], input[i]));
        }
        return Pairing.pairing(
            Pairing.negate(_proof.A),
            _proof.B,
            vk.alfa1,
            vk.beta2,
            vk_x,
            vk.gamma2,
            _proof.C,
            vk.delta2
        );
    }
}